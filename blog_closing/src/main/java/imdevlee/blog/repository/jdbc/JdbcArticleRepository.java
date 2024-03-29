package imdevlee.blog.repository.jdbc;

import imdevlee.blog.domain.Article;
import imdevlee.blog.repository.dto.ArticleSearchConditionDto;
import imdevlee.blog.repository.ArticleRepository;
import imdevlee.blog.repository.mapper.ArticleMapper;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class JdbcArticleRepository implements ArticleRepository {

    private final ArticleMapper articleMapper;

    @Override
    public Article save(Article article) {
        articleMapper.save(article);

        return article;
    }

    @Override
    public void update(Long id, Article updateArticle) {
        articleMapper.update(id, updateArticle);
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
