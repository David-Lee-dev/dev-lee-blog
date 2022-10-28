package imdevlee.blog.service;

import imdevlee.blog.domain.Category;

import java.util.List;

public interface CategoryService {
    List<Category> getCategoryList(String type);
}
