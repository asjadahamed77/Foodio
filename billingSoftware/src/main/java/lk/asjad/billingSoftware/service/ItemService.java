package lk.asjad.billingSoftware.service;

import lk.asjad.billingSoftware.io.ItemRequest;
import lk.asjad.billingSoftware.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);

    List<ItemResponse> fetchItems();

    void deleteItem(String itemId);

}
