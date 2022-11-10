package imdevlee.blog.config;


import imdevlee.blog.repository.*;
import imdevlee.blog.repository.interfaces.ArticleRepository;
import imdevlee.blog.repository.interfaces.CategoryRepository;
import imdevlee.blog.repository.mapper.ArticleMapper;
import imdevlee.blog.repository.mapper.CategoryMapper;
import imdevlee.blog.web.interceptor.LogInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class AppConfig  implements WebMvcConfigurer {

    private final CategoryMapper categoryMapper;
    private final ArticleMapper articleMapper;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(("/**"));
    }

    @Bean
    public CategoryRepository categoryRepository() {
        return new JdbcCategoryRepository(categoryMapper);
    }

    @Bean
    public ArticleRepository articleRepository() {
        return new JdbcArticleRepository(articleMapper);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/css/**", "/*.ico", "/error");
    }
}
