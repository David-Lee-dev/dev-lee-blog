package imdevlee.blog.repository;

import imdevlee.blog.domain.Category;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class MemoryCategoryRepositoryTest {

    MemoryCategoryRepository memoryCategoryRepository = new MemoryCategoryRepository();

    @AfterEach
    void afterEach() {
        memoryCategoryRepository.clearStore();
    }

    @Test
    void createCategory() {
        Category category = new Category("test category1");

        Category createdCategory = memoryCategoryRepository.createCategory(category);

        assertThat(category).isEqualTo(createdCategory);
    }

    @Test
    void deleteCategory() {
        Category category = new Category("test category1");

        Category createdCategory = memoryCategoryRepository.createCategory(category);
        memoryCategoryRepository.deleteCategory(createdCategory.getId());

        assertThat(createdCategory).isNotIn(memoryCategoryRepository.findCategories());
    }

    @Test
    void findCategoryByName() {
        Category category = new Category("test category1");

        Category createdCategory = memoryCategoryRepository.createCategory(category);
        Category foundCategory = memoryCategoryRepository.findCategoryByName(createdCategory.getName());

        assertThat(createdCategory).isEqualTo(foundCategory);
    }

    @Test
    void findCategories() {
        Category category1 = new Category("test category1");
        Category category2 = new Category("test category2");

        memoryCategoryRepository.createCategory(category1);
        memoryCategoryRepository.createCategory(category2);

        List<Category> categories = memoryCategoryRepository.findCategories();

        assertThat(categories).contains(category1, category2);
    }
}