package imdevlee.blog.repository.jpa;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import imdevlee.blog.domain.Article;
import imdevlee.blog.repository.ArticleRepository;
import imdevlee.blog.repository.dto.ArticleSearchConditionDto;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import java.util.List;

import static imdevlee.blog.domain.QArticle.*;

public class JpaArticleRepository implements ArticleRepository {

    private final EntityManager em;
    private final JPAQueryFactory query;

    public JpaArticleRepository(EntityManager em) {
        this.em = em;
        this.query = new JPAQueryFactory(em);
    }

    @Override
    @Transactional
    public Article save(Article article) {
        em.persist(article);
        return article;
    }

    @Override
    @Transactional
    public void update(Long id, Article update) {
        Article article = findById(id);

        article.setTitle(update.getTitle());
        article.setContents(update.getContents());
        article.setImages(update.getImages());
        article.setTags(update.getTags());
        article.setCategoryId(update.getCategoryId());
    }

    @Override
    @Transactional
    public void delete(Long id) {
        em.remove(findById(id));
    }

    @Override
    public Article findById(Long id) {
        return em.find(Article.class, id);
    }

    @Override
    public List<Article> findAll(ArticleSearchConditionDto searchQuery) {
        String type = searchQuery.getType();
        String queryString = searchQuery.getQueryString();
        Long categoryId = searchQuery.getCategoryId();

        List<Article> result = query
                .select(article)
                .from(article)
                .where(article.type.eq(type), categorySearch(categoryId), querySearch(queryString))
                .orderBy(article.createdTime.desc())
                .fetch();


        return result;
    }

    private BooleanExpression categorySearch(Long categoryId) {
        if (categoryId != null) {
            return article.categoryId.eq(categoryId);
        }

        return null;
    }

    private BooleanExpression querySearch(String queryString) {
        if (StringUtils.hasText(queryString)) {
            return article.title.like("%" + queryString + "%").or(article.tags.like("%" + queryString + "%"));
        }

        return null;
    }
}
