package lk.asjad.billingSoftware.controller;


import lk.asjad.billingSoftware.io.CategoryRequest;
import lk.asjad.billingSoftware.io.CategoryResponse;
import lk.asjad.billingSoftware.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor

public class CategoryController {

    private final CategoryService categoryService;

@PostMapping
@ResponseStatus(HttpStatus.CREATED )
    public CategoryResponse addCategory(@RequestBody CategoryRequest request) {
    return categoryService.add(request);
    }

}
