package br.com.formula1.cadastro_piloto.infrastructure.entitys;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "piloto")
@Entity
public class PilotoF1 {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "nacionalidade", nullable = false)
    private String nacionalidade;

    @Column(name = "equipe", nullable = false)
    private String equipe;

    @Column(name = "ativo", nullable = false)
    private boolean ativo;
}
