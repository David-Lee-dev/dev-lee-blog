package imdevlee.blog.service;

import imdevlee.blog.domain.Article;
import imdevlee.blog.repository.ArticleRepository;
import imdevlee.blog.repository.CategoryRepository;
import imdevlee.blog.repository.MemoryArticleRepository;
import imdevlee.blog.repository.MemoryCategoryRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

class ArticleServiceImplTest {

    MemoryArticleRepository articleRepository = new MemoryArticleRepository();
    MemoryCategoryRepository categoryRepository = new MemoryCategoryRepository();
    ArticleService articleService = new ArticleServiceImpl(articleRepository, categoryRepository);

    @BeforeEach
    void afterEach() {
        articleRepository.clearStore();
    }

    @Test
    void create() {
        Long result = articleService.create("test_title", "post", new String[]{"test tag1", "test tag2"}, "test_category");

        assertThat(result).isNotNull();
    }

    @Test
    void createWithWrongType() {
        Long result = articleService.create("test_title", "wrong type", new String[]{"test tag1", "test tag2"}, "test_category");

        assertThat(result).isEqualTo(null);
    }

    @Test
    void update() {
        Long id = articleService.create("test_title", "post", new String[]{"test tag1", "test tag2"}, "test_category");

        Long result = articleService.update(id, "test_title", "post", new String[]{"test tag1", "test tag2"}, "test_category");
        assertThat(result).isEqualTo(id);
    }

    @Test
    void updateNullTarget() {
        Long result = articleService.update(100L, "test_title", "post", new String[]{"test tag1", "test tag2"}, "test_category");

        assertThat(result).isEqualTo(null);
    }

    @Test
    void delete() {
        Long id = articleService.create("test_title", "post", new String[]{"test tag1", "test tag2"}, "test_category");

        boolean result = articleService.delete(id);
        assertThat(result).isEqualTo(true);
    }

    @Test
    void deleteNullTarget() {
        boolean result = articleService.delete(100L);
        assertThat(result).isEqualTo(false);
    }

    @Test
    void searchById() {
        Long id = articleService.create("test_title", "post", new String[]{"test tag1", "test tag2"}, "test_category");

        List<Article> result = articleService.search(id, null, null, "post");

        assertThat(result.size()).isEqualTo(1);
        assertThat(result.get(0).getId()).isEqualTo(id);
    }

    @Test
    void searchByQueryString() {
        articleService.create("test_title", "post", new String[]{"test tag1", "test tag2"}, "test_category");
        articleService.create("no_search", "post", new String[]{"no_search tag1", "no_search tag2"}, "test_category");

        List<Article> result1 = articleService.search(null, "test_title", null, "post");
        List<Article> result2 = articleService.search(null, "tag1", null, "post");

        assertThat(result1.size()).isEqualTo(1);
        assertThat(result2.size()).isEqualTo(2);
    }
    
    @Test
    void searchByCategory() {
        articleService.create("test_title", "post", new String[]{"test tag1", "test tag2"}, "test_category");
        articleService.create("no_search", "post", new String[]{"no_search tag1", "no_search tag2"}, "test_category");
        articleService.create("dummy", "post", new String[]{"dummy tag1", "dummy tag2"}, "test_category");

        List<Article> result = articleService.search(null, null, "test_category", "post");

        assertThat(result.size()).isEqualTo(3);
    }
    
    @Test
    void searchByType() {
        articleService.create("test_title", "post", new String[]{"test tag1", "test tag2"}, "test_category");
        articleService.create("no_search", "post", new String[]{"no_search tag1", "no_search tag2"}, "test_category");
        articleService.create("dummy", "note", new String[]{"dummy tag1", "dummy tag2"}, "test_category");

        List<Article> result = articleService.search(null, null, null, "post");

        assertThat(result.size()).isEqualTo(2);
    }

    @Test
    void searchResultIsZero() {

        List<Article> result1 = articleService.search(1L, null, null, "post");
        List<Article> result2 = articleService.search(null, null, "test_category", "post");
        List<Article> result3 = articleService.search(null, "test_title", null, "post");
        List<Article> result4 = articleService.search(null, null, null, "post");

        assertThat(result1.size()).isEqualTo(0);
        assertThat(result2.size()).isEqualTo(0);
        assertThat(result3.size()).isEqualTo(0);
        assertThat(result4.size()).isEqualTo(0);
    }


}