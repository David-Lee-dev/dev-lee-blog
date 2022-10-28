package imdevlee.blog.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Article {

    private Long id;
    private String type;
    private String title;
    private String contents;
    private String[] images;
    private String[] tags;
    private String createdTime;
    private Category category;

    public Article(String title, String type,String contents, String[] images, String[] tags, String createdTime) {
        this.title = title;
        this.type = type;
        this.tags = tags;
        this.contents = contents;
        this.images = images;
        this.createdTime = createdTime;
    }
}
