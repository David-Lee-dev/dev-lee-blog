package imdevlee.blog.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Category {

    private Long id;
    private String name;
    private String type;

    public Category() {
    }

    public Category(String name, String type) {
        this.name = name;
        this.type = type;
    }
}
