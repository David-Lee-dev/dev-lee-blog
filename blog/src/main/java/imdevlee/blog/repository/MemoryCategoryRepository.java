package imdevlee.blog.repository;

import imdevlee.blog.domain.Category;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemoryCategoryRepository implements CategoryRepository{

    private static final Map<Long, Category> store = new HashMap<>();
    private static Long sequence = 0L;

    @Override
    public Category createCategory(Category category) {
        Category foundCategory = findCategoryByName(category.getName(), category.getType());

        if (foundCategory == null) {
            category.setId(++sequence);
            store.put(category.getId(), category);
            return category;
        }
        
        return foundCategory;
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category deletedCategory = store.get(categoryId);
        store.remove(categoryId);
    }

    @Override
    public Category findCategoryByName(String name, String type) {
        List<Category> categoryList = findCategories();

        for (Category category : categoryList) {
            if (category.getType().equals(type) && category.getName().equals(name)) {
                return category;
            }
        }

        return null;
    }

    @Override
    public List<Category> findCategories() {

        return new ArrayList<>(store.values());
    }

    public void clearStore() {
        store.clear();
    }
}
