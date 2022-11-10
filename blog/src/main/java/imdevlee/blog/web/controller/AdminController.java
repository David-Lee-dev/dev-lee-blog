package imdevlee.blog.web.controller;

import imdevlee.blog.service.ArticleService;
import imdevlee.blog.service.dto.SaveArticleDto;
import imdevlee.blog.web.FileStore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Controller
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final FileStore fileStore;
    private final ArticleService articleService;

    @GetMapping("/save")

    public String addFrom(Model model) {
        model.addAttribute("saveParam", new ArticleForm());
        return "saveForm";
    }

    @PostMapping("/save")
    public String saveArticle(@ModelAttribute ArticleForm articleForm) throws IOException {
        String dirName = fileStore.getDirName(articleForm.getContentsFile());
        String contents = fileStore.storeFile(articleForm.getContentsFile(), dirName);
        String[] images = fileStore.storeFiles(articleForm.getImageFiles(), dirName);

        articleService.saveArticle(new SaveArticleDto(
                articleForm.getTitle(),
                articleForm.getType(),
                contents,
                images,
                articleForm.getTags().split(","),
                articleForm.getCategoryName()
        ));

        return "redirect:/admin/save";
    }
}
