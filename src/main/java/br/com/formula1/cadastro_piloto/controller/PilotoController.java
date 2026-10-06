package br.com.formula1.cadastro_piloto.controller;

import br.com.formula1.cadastro_piloto.business.PilotoService;
import br.com.formula1.cadastro_piloto.infrastructure.entitys.PilotoF1;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/piloto")
@RequiredArgsConstructor
public class PilotoController {

    private final PilotoService pilotoService;

    @PostMapping
    public ResponseEntity<Void> salvarPiloto(@RequestBody PilotoF1 piloto) {
        pilotoService.salvar(piloto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/todos")
    public ResponseEntity<List<PilotoF1>> listarTodos() {
        return ResponseEntity.ok(pilotoService.listarTodos());
    }

    @GetMapping("/id")
    public ResponseEntity<PilotoF1> buscarPilotoPorId(@RequestParam Integer id) {
        return ResponseEntity.ok(pilotoService.buscarPorId(id));
    }

    @GetMapping("/nome")
    public ResponseEntity<PilotoF1> buscarPilotoPorNome(@RequestParam String nome) {
        return ResponseEntity.ok(pilotoService.buscarPilotoPorNome(nome));
    }

    @PutMapping
    public ResponseEntity<Void> atualizarPilotoPorId(
            @RequestBody PilotoF1 piloto,
            @RequestParam Integer id) {
        pilotoService.atualizar(id, piloto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deletarPilotoPorNome(@RequestParam String nome) {
        pilotoService.deletarPorNome(nome);
        return ResponseEntity.ok().build();
    }
}