package lk.asjad.billingSoftware.service;

import lk.asjad.billingSoftware.io.CategoryRequest;
import lk.asjad.billingSoftware.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest categoryRequest, MultipartFile file );

    List<CategoryResponse> read();

    void delete(String categoryId);

}
