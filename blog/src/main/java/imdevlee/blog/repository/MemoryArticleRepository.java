package imdevlee.blog.repository;

import imdevlee.blog.domain.Article;
import imdevlee.blog.domain.Category;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemoryArticleRepository implements ArticleRepository{
    private final Map<Long, Article> store = new HashMap<>();
    private static Long sequence = 0L;

    @Override
    public Article createArticle(Article article, Category category) {

        article.setId(++sequence);
        article.setCategory(category);
        store.put(article.getId(), article);

        return article;
    }

    @Override
    public Article updateArticle(Long articleId, Article article, Category category) {
        Article foundArticle = findArticleById(articleId);
        foundArticle.setTitle(article.getTitle());
        foundArticle.setContentsPath(article.getContentsPath());
        foundArticle.setTags(article.getTags());
        foundArticle.setCategory(category);

        return foundArticle;
    }

    @Override
    public void deleteArticle(Long articleId) {
        store.remove(articleId);
    }

    @Override
    public Article findArticleById(Long articleId) {
        return store.get(articleId);
    }

    @Override
    public List<Article> findArticles() {
        return new ArrayList<>(store.values());
    }


    public void clearStore() {
        store.clear();
    }
}
