package imdevlee.blog.service;

import imdevlee.blog.domain.Article;
import imdevlee.blog.domain.ArticleType;
import imdevlee.blog.domain.Category;
import imdevlee.blog.repository.ArticleRepository;
import imdevlee.blog.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService{

    private final ArticleRepository articleRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public Long create(
            String title,
            String type,
            String contents,
            String[] images,
            String[] tags,
            String categoryName
    ) {
        Article article;
        if (ArticleType.POST.toString().equals(type)){
            article = new Article(title, type, contents, images, tags, LocalDate.now().toString());
        } else if (ArticleType.NOTE.toString().equals(type)) {
            article = new Article(title, type, contents, images, tags, LocalDate.now().toString());
        } else {
            return null;
        }

        Category category = categoryRepository.createCategory(new Category(categoryName, type));

        articleRepository.createArticle(article, category);
        return article.getId();
    }

    @Override
    public Long update(
            Long id,
            String title,
            String contents,
            String[] images,
            String[] tags,
            String categoryName) {
        Article target = articleRepository.findArticleById(id);


        if (target == null) return null;
        Category category = categoryRepository.createCategory(new Category(categoryName, target.getType()));

        articleRepository.updateArticle(target.getId(), new Article(title, target.getType(),contents, images, tags, target.getCreatedTime()), category);

        return id;
    }

    @Override
    public boolean delete(Long id) {
        Article target = articleRepository.findArticleById(id);
        if (target == null) return false;

        articleRepository.deleteArticle(target.getId());

        return true;
    }

    public List<Article> search(@Nullable Long id, @Nullable String searchQuery, @Nullable String categoryName, String type) {

        // 단일 검색
        if (id != null) {
            Article article = articleRepository.findArticleById(id);

            if (article == null) return new ArrayList<>();

            return new ArrayList<>(Arrays.asList(article));
        }

        Stream<Article> articles = articleRepository.findArticles().stream().filter(article -> article.getType().equals(type));

        // 검색어 이용 검색
        if (searchQuery != null) {
            return articles.filter(article -> article.getTitle().contains(searchQuery) || searchQueryInTags(article.getTags(), searchQuery)).collect(Collectors.toList());
        }

        // 카테고리 검색
        if (categoryName != null) {
            return articles.filter(article -> article.getCategory().getName().equals(categoryName)).collect(Collectors.toList());
        }

        //타입 이용 전체 검색
        return articles.collect(Collectors.toList());
    }

    private boolean searchQueryInTags(String[] tags, String queryString) {
        for (String tag : tags) {
            if (tag.contains(queryString)) return true;
        }

        return false;
    }
}
