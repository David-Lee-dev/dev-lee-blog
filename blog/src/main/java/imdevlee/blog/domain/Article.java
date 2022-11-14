package imdevlee.blog.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Arrays;

@Getter
@Setter
@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String title;
    private String contents;
    private String images;
    private String tags;
    @Column(name = "created_time")
    private String createdTime;
    private Long categoryId;

    public Article() {
    }

    public Article(String title, String type,String contents, String images, String tags, String createdTime) {
        this.title = title;
        this.type = type;
        this.tags = tags;
        this.contents = contents;
        this.images = images;
        this.createdTime = createdTime;
    }
}
