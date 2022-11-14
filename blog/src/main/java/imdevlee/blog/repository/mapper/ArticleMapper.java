package imdevlee.blog.repository.mapper;

import imdevlee.blog.domain.Article;
import imdevlee.blog.repository.dto.ArticleSearchConditionDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface ArticleMapper {
    void save(
            @Param("article") Article article
    );

    void update(
            @Param("id") Long id,
            @Param("updateArticle") Article updateArticle
    );

    void delete(Long id);

    Optional<Article> findById(Long id);

    List<Article> findAll(
            @Param("searchQuery") ArticleSearchConditionDto searchQuery);

}
