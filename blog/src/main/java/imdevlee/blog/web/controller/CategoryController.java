package imdevlee.blog.web.controller;


import imdevlee.blog.domain.Category;
import imdevlee.blog.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @ResponseBody
    @GetMapping("/{type}")
    public List<Category> getCategory(@PathVariable String type) {

        return categoryService.getCategoryList(type).stream().filter(category -> category.getType().equals(type)).collect(Collectors.toList());
    }
}
