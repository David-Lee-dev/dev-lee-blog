package imdevlee.blog;


import imdevlee.blog.repository.ArticleRepository;
import imdevlee.blog.repository.CategoryRepository;
import imdevlee.blog.repository.MemoryArticleRepository;
import imdevlee.blog.repository.MemoryCategoryRepository;
import imdevlee.blog.web.interceptor.LogInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig  implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(("/**"));
    }

    @Bean
    public CategoryRepository categoryRepository() {
        return new MemoryCategoryRepository();
    }

    @Bean
    public ArticleRepository articleRepository() {
        return new MemoryArticleRepository();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new LogInterceptor())
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/css/**", "/*.ico", "/error");
    }
}
