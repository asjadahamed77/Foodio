package lk.asjad.billingSoftware.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.asjad.billingSoftware.entity.OrderItemEntity;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity, Long> {
    
    

}
