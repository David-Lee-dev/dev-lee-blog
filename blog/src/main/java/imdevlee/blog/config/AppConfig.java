package imdevlee.blog.config;


import com.querydsl.jpa.impl.JPAQueryFactory;
import imdevlee.blog.repository.ArticleRepository;
import imdevlee.blog.repository.CategoryRepository;
import imdevlee.blog.repository.jdbc.JdbcArticleRepository;
import imdevlee.blog.repository.jdbc.JdbcCategoryRepository;
import imdevlee.blog.repository.jpa.JpaArticleRepository;
import imdevlee.blog.repository.jpa.JpaCategoryRepository;
import imdevlee.blog.repository.mapper.ArticleMapper;
import imdevlee.blog.repository.mapper.CategoryMapper;
import imdevlee.blog.web.interceptor.LogInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.persistence.EntityManager;

@Configuration
@RequiredArgsConstructor
public class AppConfig  implements WebMvcConfigurer {

    private final EntityManager em;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(("/**"));
    }

    @Bean
    public CategoryRepository categoryRepository() {
        return new JpaCategoryRepository(em);
    }

    @Bean
    public ArticleRepository articleRepository() {
        return new JpaArticleRepository(em);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/css/**", "/*.ico", "/error");
    }

//    private final CategoryMapper categoryMapper;
//    private final ArticleMapper articleMapper;
//    @Bean
//    public CategoryRepository categoryRepository() {
//        return new JdbcCategoryRepository(categoryMapper);
//    }
//    @Bean
//    public ArticleRepository articleRepository() {
//        return new JdbcArticleRepository(articleMapper);
//    }
}
