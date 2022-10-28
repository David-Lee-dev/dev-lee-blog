package imdevlee.blog.repository;

import imdevlee.blog.domain.Category;

import java.util.List;

public interface CategoryRepository {
    Category createCategory(Category category);
    void deleteCategory(Long CategoryId);

    Category findCategoryByName(String name, String type);
    List<Category> findCategories();
}
