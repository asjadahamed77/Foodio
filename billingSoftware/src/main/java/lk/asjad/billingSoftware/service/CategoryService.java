package lk.asjad.billingSoftware.service;

import lk.asjad.billingSoftware.io.CategoryRequest;
import lk.asjad.billingSoftware.io.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest categoryRequest);

    List<CategoryResponse> read();

}
