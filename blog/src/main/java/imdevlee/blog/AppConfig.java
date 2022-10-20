package imdevlee.blog;


import imdevlee.blog.repository.ArticleRepository;
import imdevlee.blog.repository.CategoryRepository;
import imdevlee.blog.repository.MemoryArticleRepository;
import imdevlee.blog.repository.MemoryCategoryRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public CategoryRepository categoryRepository() {
        return new MemoryCategoryRepository();
    }

    @Bean
    public ArticleRepository articleRepository() {
        return new MemoryArticleRepository();
    }
}
