package lk.asjad.billingSoftware.service.impl;

import lk.asjad.billingSoftware.entity.CategoryEntity;
import lk.asjad.billingSoftware.io.CategoryRequest;
import lk.asjad.billingSoftware.io.CategoryResponse;
import lk.asjad.billingSoftware.repository.CategoryRepository;
import lk.asjad.billingSoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final FileUploadService fileUploadService;

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {
        String imgUrl  = fileUploadService.uploadFile(file);
        CategoryEntity newCategory = convertToEntity(request);
        newCategory.setImageUrl(imgUrl);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryEntity ->  convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
         CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId)
                 .orElseThrow(() -> new RuntimeException("Category not found"+ categoryId) );
         fileUploadService.deleteFIle(existingCategory.getImageUrl());
categoryRepository.delete(existingCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .imageUrl(newCategory.getImageUrl())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
         return CategoryEntity.builder()
                 .categoryId(UUID.randomUUID().toString())
                 .name(request.getName())
                 .bgColor(request.getBgColor())
                 .description((request.getDescription()))
                 .build();
    }
}
