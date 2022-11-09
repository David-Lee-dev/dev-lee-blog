package imdevlee.blog.repository.interfaces;

import imdevlee.blog.domain.Article;
import imdevlee.blog.repository.dto.ArticleSearchConditionDto;

import java.util.List;

public interface ArticleRepository {
    Article save(Article article, Long categoryId);
    void update(Long id, Article article);
    void delete(Long id);

    Article findById(Long id);

    public List<Article> findAll(ArticleSearchConditionDto searchQuery);
}
