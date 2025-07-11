package lk.asjad.billingSoftware.service;

import lk.asjad.billingSoftware.io.CategoryRequest;
import lk.asjad.billingSoftware.io.CategoryResponse;

public interface CategoryService {

    CategoryResponse add(CategoryRequest categoryRequest);

}
