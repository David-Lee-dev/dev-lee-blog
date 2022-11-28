package imdevlee.blog.web.controller;


import imdevlee.blog.domain.Article;
import imdevlee.blog.domain.Category;
import imdevlee.blog.service.ArticleService;
import imdevlee.blog.service.CategoryService;
import imdevlee.blog.web.FileStore;
import imdevlee.blog.web.controller.dto.ResponseArticleDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.MalformedURLException;
import java.util.*;

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

        BufferedReader bf = new BufferedReader(new InputStreamReader(new FileInputStream(contentsPath), "utf-8"));

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
        return new UrlResource("file:" + fileStore.getFullPath(dir + "/" + filename));
    }

    @ResponseBody
    @GetMapping("/article")
    public Map<String, Object> getArticleList(
            @RequestParam String type,
            @RequestParam int page,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) String queryString
    ) {
        List<Article> articleList = articleService.getArticleList(type, categoryId, queryString);

        List<ResponseArticleDto> articles = new ArrayList<>();
        articleList.forEach(article -> {
            articles.add(new ResponseArticleDto(article, getThumbnail(article.getContents(), article.getImages())));
        });

        int fromIndex = 10 * (page - 1);
        int toIndex = 10 * page;

        if (articles.size() < toIndex) toIndex = articles.size();

        Map<String, Object> response = new HashMap<>();
        response.put("articles", new ArrayList<>(articles.subList(fromIndex, toIndex)));
        response.put("count", Math.ceil(articleList.size() / 10d));

        return response;
    }

    private String getThumbnail(String contents, String images) {
        if (images == null || images.equals("")) {
            return null;
        }

        return fileStore.getDirName(contents) + "/" + images.split(" ")[0];
    }
}
