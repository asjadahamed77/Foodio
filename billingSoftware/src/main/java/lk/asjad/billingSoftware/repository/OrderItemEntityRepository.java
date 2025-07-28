package lk.asjad.billingSoftware.repository;


import lk.asjad.billingSoftware.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity, Long> {
    
    

}
