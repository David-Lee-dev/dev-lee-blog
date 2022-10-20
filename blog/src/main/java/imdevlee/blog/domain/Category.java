package imdevlee.blog.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Category {

    private Long id;
    private String name;

    public Category(String name) {
        this.name = name;
    }
}
