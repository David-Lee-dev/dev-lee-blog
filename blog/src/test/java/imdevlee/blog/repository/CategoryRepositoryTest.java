package imdevlee.blog.repository;

import imdevlee.blog.domain.Category;
import imdevlee.blog.repository.interfaces.CategoryRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@SpringBootTest
@Transactional
class CategoryRepositoryTest {

    @Autowired
    CategoryRepository categoryRepository;

    @Test
    void save() {
        Category savedCategory = categoryRepository.save(new Category("test", "post"));
        Category find = categoryRepository.findById(savedCategory.getId());

        Assertions.assertThat(savedCategory.getId()).isEqualTo(find.getId());
        Assertions.assertThat(savedCategory.getName()).isEqualTo(find.getName());
        Assertions.assertThat(savedCategory.getType()).isEqualTo(find.getType());

    }

    @Test
    void delete() {
        Category savedCategory = categoryRepository.save(new Category("test", "post"));
        categoryRepository.delete(savedCategory.getId());

        Category find = categoryRepository.findById(savedCategory.getId());
        Assertions.assertThat(find).isNull();
    }

    @Test
    void findAll() {
        categoryRepository.save(new Category("test", "post"));
        categoryRepository.save(new Category("test2", "post"));
        categoryRepository.save(new Category("test3", "post"));

        List<Category> categories = categoryRepository.findAll("post");

        Assertions.assertThat(categories.size()).isEqualTo(3);
    }
}