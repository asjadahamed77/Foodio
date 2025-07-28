package lk.asjad.billingSoftware.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.asjad.billingSoftware.entity.OrderEntity;

public interface OrderEntityRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findByOrderId(String orderId);
    List<OrderEntity> findAllByOrderByCreatedAtDesc()
}
