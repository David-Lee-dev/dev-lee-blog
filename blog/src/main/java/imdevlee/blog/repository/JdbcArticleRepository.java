package imdevlee.blog.repository;

import imdevlee.blog.domain.Article;
import imdevlee.blog.repository.dto.ArticleSearchConditionDto;
import imdevlee.blog.repository.dto.UpdateArticleDto;
import imdevlee.blog.repository.interfaces.ArticleRepository;
import imdevlee.blog.repository.mapper.ArticleMapper;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class JdbcArticleRepository implements ArticleRepository {

    private final ArticleMapper articleMapper;

    @Override
    public Article save(Article article, Long categoryId) {
        articleMapper.save(article, categoryId);

        return article;
    }

    @Override
    public void update(Long id, UpdateArticleDto updateParam) {
        articleMapper.update(id, updateParam);
    }

    @Override
    public void delete(Long id) {
        articleMapper.delete(id);
    }

    @Override
    public Article findById(Long id) {
        Optional<Article> article = articleMapper.findById(id);
        return article.orElse(null);
    }

    @Override
    public List<Article> findAll(ArticleSearchConditionDto searchQuery) {
        return articleMapper.findAll(searchQuery);
    }
}
