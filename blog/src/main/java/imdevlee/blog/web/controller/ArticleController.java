package imdevlee.blog.web.controller;

import imdevlee.blog.domain.Article;
import imdevlee.blog.service.ArticleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@RequestMapping("/api/article")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleService articleService;

    @ResponseBody
    @PostMapping("/add")
    public String addArticle(
            @Validated @RequestBody SaveArticle saveData
    ) {
        articleService.create(saveData.getTitle(), saveData.getType(), saveData.getTags(), saveData.getCategoryName());
        return "ok";
    }

    @ResponseBody
    @GetMapping("/{type}")
    public List<Article> searchArticle(
            @RequestParam(required = false) Long id,
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = false) String categoryName,
            @PathVariable String type
    ) {
        List<Article> result = articleService.search(id, searchQuery, categoryName, type);
        return result;
    }
}
