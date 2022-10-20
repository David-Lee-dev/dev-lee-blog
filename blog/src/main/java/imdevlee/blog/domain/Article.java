package imdevlee.blog.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Article {

    private Long id;
    private String type;
    private String title;
    private String contentsPath;
    private String[] tags;
    private String createdTime;
    private Category category;

    public Article(String title, String type, String contentsPath, String[] tags, String createdTime) {
        this.title = title;
        this.type = type;
        this.contentsPath = contentsPath;
        this.tags = tags;
        this.createdTime = createdTime;
    }
}
