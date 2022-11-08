package imdevlee.blog.repository.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Arrays;

@Getter
@Setter
public class UpdateArticleDto {
    private String title;
    private String contents;
    private String images;
    private String tags;
    private Long categoryId;

    public UpdateArticleDto(String title, String contents, String[] images, String[] tags, Long categoryId) {
        this.title = title;
        this.contents = contents;
        this.images = Arrays.toString(images);
        this.tags = Arrays.toString(tags);
        this.categoryId = categoryId;
    }
}
