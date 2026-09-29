package br.com.formula1.cadastro_piloto.controller;

import br.com.formula1.cadastro_piloto.business.PilotoService;
import br.com.formula1.cadastro_piloto.infrastructure.entitys.PilotoF1;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/piloto")
@RequiredArgsConstructor
public class PilotoController {

    private final PilotoService pilotoService;

    @PostMapping
    public PilotoF1 salvar(@RequestBody PilotoF1 piloto) {
        return pilotoService.salvar(piloto);
    }

    @GetMapping
    public List<PilotoF1> listarTodos() {
        return pilotoService.listarTodos();
    }

    @GetMapping("/id/{id}")
    public PilotoF1 buscarPorId(@PathVariable Integer id) {
        return pilotoService.buscarPorId(id);
    }

    @GetMapping("/nome/{nome}")
    public PilotoF1 buscarPorNome(@PathVariable String nome) {
        return pilotoService.buscarPilotoPorNome(nome);
    }

    @PutMapping("/{id}")
    public PilotoF1 atualizar(
            @PathVariable Integer id,
            @RequestBody PilotoF1 piloto) {

        return pilotoService.atualizar(id, piloto);
    }

    @DeleteMapping("/nome/{nome}")
    public void deletarPorNome(@PathVariable String nome) {
        pilotoService.deletarPorNome(nome);
    }
}

