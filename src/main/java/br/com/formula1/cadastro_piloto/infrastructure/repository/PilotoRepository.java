package br.com.formula1.cadastro_piloto.infrastructure.repository;

import br.com.formula1.cadastro_piloto.infrastructure.entitys.PilotoF1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PilotoRepository extends JpaRepository<PilotoF1, Integer> {

    Optional<PilotoF1> findByNome(String nome);
}

