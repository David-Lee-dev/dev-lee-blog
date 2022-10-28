package imdevlee.blog.web.controller;

import imdevlee.blog.domain.Article;
import imdevlee.blog.service.ArticleService;
import imdevlee.blog.web.FileStore;
import imdevlee.blog.web.dto.SaveArticleDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Controller
@RequestMapping("/api/article")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;
    private final FileStore fileStore;

    @ResponseBody
    @PostMapping(value = "/add", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public String addArticle(
            @Validated @RequestPart SaveArticleDto data,
            @Validated @RequestPart MultipartFile contentsFile,
            @Validated @RequestPart List<MultipartFile> imageFiles
            ) throws IOException {
        String contents = fileStore.storeFile(contentsFile);
        String[] images = fileStore.storeFiles(imageFiles);

        articleService.create(data.getTitle(), data.getType(),contents, images, data.getTags(), data.getCategoryName());
        return "ok";
    }

    @ResponseBody
    @GetMapping("/{type}")
    public List<Article> searchArticle(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = false) String categoryName,
            @RequestParam int page,
            @PathVariable String type
    ) {
        List<Article> result = articleService.search(id, searchQuery, categoryName, type);

        int fromIndex = 10 * (page - 1);
        int toIndex = 10 * page;

        if (result.size() < toIndex) toIndex = result.size();

        return new ArrayList<>(result.subList(fromIndex, toIndex));
    }

    @ResponseBody
    @GetMapping("/{type}/{id}")
    public String getArticleDetail(@PathVariable String type, @PathVariable Long id) throws IOException {
        Article article = articleService.search(id, null, null, type).get(0);
        String contentsPath = fileStore.getFullPath(article.getContents());

        BufferedReader bf = new BufferedReader(new FileReader(contentsPath));

        String result = "";
        String str;
        while ((str = bf.readLine()) != null) {
            str = str.replace("![img](", "![img](http://localhost:8080/api/article/images/");
            result += str + "\n";
        }
        bf.close();

        return result;
    }


    @ResponseBody
    @GetMapping("/images/{filename}")
    public Resource downloadImage(@PathVariable String filename) throws MalformedURLException {
        return new UrlResource("file:" + fileStore.getFullPath(filename));
    }
}
