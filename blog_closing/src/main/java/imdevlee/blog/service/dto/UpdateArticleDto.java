package imdevlee.blog.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;

@Getter
@Setter
public class UpdateArticleDto {
    private String title;
    private String contents;
    private String[] images;
    private String[] tags;
    private String categoryName;

    public UpdateArticleDto(String title, String contents, String[] images, String[] tags, String categoryName) {
        this.title = title;
        this.contents = contents;
        this.images = images;
        this.tags = tags;
        this.categoryName = categoryName;
    }
}
