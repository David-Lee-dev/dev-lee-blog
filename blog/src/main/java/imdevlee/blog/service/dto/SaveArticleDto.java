package imdevlee.blog.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;

@Getter
@Setter
public class SaveArticleDto {
    private String type;
    private String title;
    private String contents;
    private String[] images;
    private String[] tags;
    private String categoryName;

    public SaveArticleDto(String title, String type,String contents, String[] images, String[] tags, String categoryName) {
        this.title = title;
        this.type = type;
        this.contents = contents;
        this.images = images;
        this.tags = tags;
        this.categoryName = categoryName;
    }
}
