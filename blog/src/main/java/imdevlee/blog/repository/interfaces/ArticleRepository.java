package imdevlee.blog.repository.interfaces;

import imdevlee.blog.domain.Article;
import imdevlee.blog.repository.dto.ArticleSearchConditionDto;
import imdevlee.blog.repository.dto.UpdateArticleDto;

import java.util.List;

public interface ArticleRepository {
    Article save(Article article, Long categoryId);
    void update(Long id, UpdateArticleDto updateParam);
    void delete(Long id);

    Article findById(Long id);

    public List<Article> findAll(ArticleSearchConditionDto searchQuery);
}
