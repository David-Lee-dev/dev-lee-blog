package imdevlee.blog.service;

import imdevlee.blog.domain.Article;
import imdevlee.blog.service.dto.SaveArticleDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class ArticleServiceTest {

    @Autowired
    ArticleService articleService;

    @Test
    void saveArticle() {
        SaveArticleDto saveParam = new SaveArticleDto(
                "test title",
                "post",
                "test contents",
                new String[]{"test tag1", "test tag2"},
                new String[]{"test img1", "test img2"},
                "test cate"
        );

        articleService.saveArticle(saveParam);
        Article article = articleService.getArticle(1l);
        List<Article> articleList = articleService.getArticleList("post", null, null);

        assertThat(article.getId()).isEqualTo(1);
        assertThat(articleList.size()).isEqualTo(1);
    }
}