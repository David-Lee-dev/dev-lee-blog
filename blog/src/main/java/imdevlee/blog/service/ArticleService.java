package imdevlee.blog.service;

import imdevlee.blog.domain.Article;
import imdevlee.blog.domain.Category;
import imdevlee.blog.repository.dto.ArticleSearchConditionDto;
import imdevlee.blog.repository.interfaces.ArticleRepository;
import imdevlee.blog.repository.interfaces.CategoryRepository;
import imdevlee.blog.service.dto.SaveArticleDto;
import imdevlee.blog.service.dto.UpdateArticleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;

    @Transactional
    public void saveArticle(SaveArticleDto saveParam) {
        Category category = categoryRepository.findByName(saveParam.getCategoryName(), saveParam.getType());

        if (category == null) {
            category = categoryRepository.save(new Category(saveParam.getCategoryName(), saveParam.getType()));
        }

        Article article = new Article(
                saveParam.getTitle(),
                saveParam.getType(),
                saveParam.getContents(),
                saveParam.getImages(),
                saveParam.getTags(),
                LocalDate.now().toString()
        );

        articleRepository.save(article, category.getId());
    }

    @Transactional
    public void updateArticle(Long id, UpdateArticleDto updateParam, String type) {
        Article article = articleRepository.findById(id);

        if (article == null) {
            throw new RuntimeException("데이터 없음");
        }

        Category categoryOfArticle = categoryRepository.findByName(updateParam.getCategoryName(), type);

        Category categoryOfUpdate = null;
        if (!updateParam.getCategoryName().equals(categoryOfArticle.getName())) {
            Category find = categoryRepository.findByName(updateParam.getCategoryName(), type);

            if (find == null) {
                categoryOfUpdate = new Category(updateParam.getCategoryName(), type);
                categoryRepository.save(categoryOfUpdate);
            } else {
                categoryOfUpdate = find;
            }
        }

        article.setTitle(updateParam.getTitle());
        article.setContents(updateParam.getContents());
        article.setImages(Arrays.toString(updateParam.getImages()));
        article.setTags(Arrays.toString(updateParam.getTags()));
        article.setCategoryId(categoryOfUpdate.getId());

        articleRepository.update(id, article);
    }

    public Article getArticle(Long id) {
        return articleRepository.findById(id);
    }

    public List<Article> getArticleList(
            String type,
            @Nullable Long categoryId,
            @Nullable String queryString
    ) {

        return articleRepository.findAll(new ArticleSearchConditionDto(queryString, categoryId, type));
    }
}
