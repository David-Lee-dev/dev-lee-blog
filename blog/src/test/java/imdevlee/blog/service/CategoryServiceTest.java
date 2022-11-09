package imdevlee.blog.service;

import imdevlee.blog.domain.Category;
import imdevlee.blog.repository.JdbcCategoryRepository;
import imdevlee.blog.repository.interfaces.CategoryRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class CategoryServiceTest {

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    CategoryService categoryService;

    @Test
    void getCategoryList() {
        categoryRepository.save(new Category("test1", "post"));
        categoryRepository.save(new Category("test2", "post"));

        List<Category> categoryList = categoryService.getCategoryList("post");

        Assertions.assertThat(categoryList.size()).isEqualTo(2);
    }
}