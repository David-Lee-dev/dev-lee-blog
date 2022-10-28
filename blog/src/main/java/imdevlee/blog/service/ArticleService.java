package imdevlee.blog.service;

import imdevlee.blog.domain.Article;
import org.springframework.lang.Nullable;

import java.util.List;

public interface ArticleService {
    Long create(String title, String type, String contents, String[] images, String[] tags, String categoryName);
    Long update(Long id, String title, String contents, String[] images, String[] tags, String categoryName);
    boolean delete(Long id);
    List<Article> search(@Nullable Long id, @Nullable String searchQuery, @Nullable String categoryName, String type);
}
