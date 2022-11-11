package imdevlee.blog.web.controller;


import imdevlee.blog.domain.Article;
import imdevlee.blog.domain.Category;
import imdevlee.blog.service.ArticleService;
import imdevlee.blog.service.CategoryService;
import imdevlee.blog.web.FileStore;
import imdevlee.blog.web.controller.dto.ResponseArticleDto;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/api")
@RequiredArgsConstructor
public class BlogController {

    @Value("${main.url}")
    public String mainUrl;

    private final ArticleService articleService;
    private final CategoryService categoryService;
    private final FileStore fileStore;

    @ResponseBody
    @GetMapping("/category/{type}")
    public List<Category> getCategoryList(@PathVariable String type) {
        return categoryService.getCategoryList(type);
    }

    @ResponseBody
    @GetMapping("/article/{id}")
    public String getArticle(@PathVariable Long id) throws IOException {
        Article article = articleService.getArticle(id);

        String dirName = fileStore.getDirName(article.getContents());
        String contentsPath = fileStore.getFullPath(dirName + "/" + article.getContents());

        BufferedReader bf = new BufferedReader(new FileReader(contentsPath));

        String result = "";
        String str;
        while ((str = bf.readLine()) != null) {
            str = str.replace("![img](", "![img](" + mainUrl + "images/" + dirName + "/");
            result += str + "\n";
        }
        bf.close();

        return result;
    }

    @ResponseBody
    @GetMapping("/images/{dir}/{filename}")
    public Resource downloadImage(@PathVariable String dir, @PathVariable String filename) throws MalformedURLException {
        System.out.println("filename = " + filename);
        return new UrlResource("file:" + fileStore.getFullPath(dir + "/" + filename));
    }

    @ResponseBody
    @GetMapping("/article")
    public ArticlesResponseEntity getArticleList(
            @RequestParam String type,
            @RequestParam int page,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String queryString
    ) {
        List<Article> articleList = articleService.getArticleList(type, categoryId, queryString);
        System.out.println("queryString = " + queryString);

        List<ResponseArticleDto> articles = new ArrayList<>();
        articleList.forEach(article -> {
            articles.add(new ResponseArticleDto(article));
        });

        int fromIndex = 10 * (page - 1);
        int toIndex = 10 * page;

        if (articles.size() < toIndex) toIndex = articles.size();



        return new ArticlesResponseEntity(new ArrayList<>(articles.subList(fromIndex, toIndex)), articles.size());
    }

    private class ArticlesResponseEntity {
        private List<ResponseArticleDto> articles;
        private int count;

        public ArticlesResponseEntity(List<ResponseArticleDto> articles, int count){
            this.articles = articles;
            this.count = count;
        }
    }
}
