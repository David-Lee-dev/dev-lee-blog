package imdevlee.blog.domain;

public enum ArticleType {
    POST("post"), NOTE("note");

    private final String description;

    @Override
    public String toString() {
        return description;
    }

    ArticleType(String description) {
        this.description = description;
    }
}
