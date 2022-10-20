package imdevlee.blog.repository;

import imdevlee.blog.domain.Article;
import imdevlee.blog.domain.ArticleType;
import imdevlee.blog.domain.Category;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.*;

class MemoryArticleRepositoryTest {

    MemoryArticleRepository memoryArticleRepository = new MemoryArticleRepository();

    @AfterEach
    void afterEach() {
        memoryArticleRepository.clearStore();
    }

    @Test
    void createArticle() {
        Category category = new Category("test category");
        LocalDate time = LocalDate.now();

        Article article = new Article("test title", ArticleType.POST.toString() , "test path", new String[]{"tag1", "tag2"}, time.toString());
        Article createdArticle = memoryArticleRepository.createArticle(article, category);
        assertThat(article).isEqualTo(createdArticle);

    }

    @Test
    void updateArticle() {
        Category category = new Category("test category");
        LocalDate time = LocalDate.now();

        Article article = new Article("test title", ArticleType.POST.toString() , "test path", new String[]{"tag1", "tag2"}, time.toString());
        Article createdArticle = memoryArticleRepository.createArticle(article, category);

        Article updateArticle = new Article("update test title", ArticleType.NOTE.toString(), "update test path", new String[]{"update tag1", "update tag2"}, article.getCreatedTime());
        Article updatedArticle = memoryArticleRepository.updateArticle(createdArticle.getId(), updateArticle, category);

        assertThat(updatedArticle.getTitle()).isEqualTo(updatedArticle.getTitle());
        assertThat(updatedArticle.getContentsPath()).isEqualTo(updatedArticle.getContentsPath());
        assertThat(updatedArticle.getTags()).isEqualTo(updatedArticle.getTags());
    }

    @Test
    void deleteArticle() {
        Category category = new Category("test category");
        LocalDate time = LocalDate.now();

        Article article = new Article("test title", ArticleType.POST.toString() , "test path", new String[]{"tag1", "tag2"}, time.toString());
        Article createdArticle = memoryArticleRepository.createArticle(article, category);

        memoryArticleRepository.deleteArticle(createdArticle.getId());

        assertThat(createdArticle).isNotIn(memoryArticleRepository.findArticles());
    }

    @Test
    void findArticleById() {
        Category category = new Category("test category");
        LocalDate time = LocalDate.now();

        Article article = new Article("test title", ArticleType.POST.toString() , "test path", new String[]{"tag1", "tag2"}, time.toString());
        Article createdArticle = memoryArticleRepository.createArticle(article, category);

        Article foundArticle = memoryArticleRepository.findArticleById(createdArticle.getId());

        assertThat(createdArticle).isEqualTo(foundArticle);
    }
}