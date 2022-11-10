package imdevlee.blog.repository;

import imdevlee.blog.domain.Article;
import imdevlee.blog.domain.Category;
import imdevlee.blog.repository.dto.ArticleSearchConditionDto;
import imdevlee.blog.repository.interfaces.ArticleRepository;
import imdevlee.blog.repository.interfaces.CategoryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class JdbcArticleRepositoryTest {

    @Autowired
    ArticleRepository articleRepository;
    @Autowired
    CategoryRepository categoryRepository;

    @Test
    void save() {
        Category category = categoryRepository.save(new Category("test cate", "post"));
        Article article = articleRepository.save(makeTestData("1"), category.getId());

        Article SavedArticle = articleRepository.findById(article.getId());
        assertThat(article.getId()).isEqualTo(SavedArticle.getId());
    }

    @Test
    void update() {
        Category category = categoryRepository.save(new Category("test cate", "post"));
        Article article = articleRepository.save(makeTestData("1"), category.getId());

        Article updateArticle = new Article(
                "updated title",
                "post",
                "updated contents",
                "updated1 ,updated2",
                "updated1, updated2",
                "updated time"
        );

        articleRepository.update(article.getId(), updateArticle);
        Article updated = articleRepository.findById(article.getId());

        assertThat(updated.getTitle()).isEqualTo(updateArticle.getTitle());
        assertThat(updated.getContents()).isEqualTo(updateArticle.getContents());
        assertThat(updated.getTags()).isEqualTo(updateArticle.getTags());
        assertThat(updated.getImages()).isEqualTo(updateArticle.getImages());
    }

    @Test
    void delete() {
        Category category = categoryRepository.save(new Category("test cate", "post"));
        Article article = articleRepository.save(makeTestData("1"), category.getId());

        articleRepository.delete(article.getId());
        Article find = articleRepository.findById(article.getId());

        assertThat(find).isNull();

    }

    @Test
    void findAll() throws InterruptedException {
        Category category = categoryRepository.save(new Category("test cate", "post"));

        articleRepository.save(makeTestData("1"), category.getId());
        articleRepository.save(makeTestData("2"), category.getId());
        articleRepository.save(makeTestData("3"), category.getId());

        List<Article> articles1 = articleRepository.findAll(new ArticleSearchConditionDto(null, null, "post"));
        List<Article> articles2 = articleRepository.findAll(new ArticleSearchConditionDto("title1", null, "post"));
        List<Article> articles3 = articleRepository.findAll(new ArticleSearchConditionDto("test", null, "post"));
        List<Article> articles4 = articleRepository.findAll(new ArticleSearchConditionDto("", category.getId(), "post"));
        List<Article> articles5 = articleRepository.findAll(new ArticleSearchConditionDto("", category.getId(), "note"));

        assertThat(articles1.size()).isEqualTo(3);
        assertThat(articles2.size()).isEqualTo(1);
        assertThat(articles3.size()).isEqualTo(3);
        assertThat(articles4.size()).isEqualTo(3);
        assertThat(articles5.size()).isEqualTo(0);

        Thread.sleep(1000);
    }

    private static Article makeTestData(String param) {
        Article article = new Article();
        article.setTitle("test title" + param);
        article.setType("post");
        article.setContents("test content file" + param);
        article.setTags("[test tag" + param + ", " + "test tag" + param + "]");
        article.setImages("[test image" + param + ", " + "test image" + param + "]");
        article.setCreatedTime(LocalDate.now().toString());
        return article;
    }
}