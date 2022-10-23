package imdevlee.blog.web.controller;

import imdevlee.blog.domain.ArticleType;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class SaveArticle {

    @NotNull
    String title;
    @NotNull
    String type;
    @NotNull
    String[] tags;
    @NotNull
    String categoryName;
    @NotNull
    String password;
}
