package lk.asjad.billingSoftware.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class ItemResponse {

    private String itemId;
    private String name;
    private String description;
    private BigDecimal price;
    private String categoryId;
    private String categoryName;
    private String imageUrl;
    private Timestamp createdAt;
    private Timestamp updatedAt;

}
