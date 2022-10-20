package imdevlee.blog.repository;

import imdevlee.blog.domain.Article;
import imdevlee.blog.domain.Category;

import java.util.List;

public interface ArticleRepository {
    Article createArticle(Article article, Category category);
    Article updateArticle(Long articleId, Article article, Category category);
    void deleteArticle(Long articleId);

    Article findArticleById(Long articleId);
    List<Article> findArticles();
}
